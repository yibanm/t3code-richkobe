const { withAppBuildGradle } = require("expo/config-plugins");

// The Expo template signs the release buildType with the debug keystore, which
// CLAUDE.md 0.10 forbids: every release build must carry the project keystore so
// users can upgrade in place. CI writes the keystore to disk and exports these
// variables, so no secret ever lands in the repo or in this file.
// Without them the debug key stays in place, which keeps local builds working.
const ENV_KEYSTORE_FILE = "T3CODE_ANDROID_KEYSTORE_FILE";
const ENV_KEYSTORE_PASSWORD = "T3CODE_ANDROID_KEYSTORE_PASSWORD";
const ENV_KEY_ALIAS = "T3CODE_ANDROID_KEY_ALIAS";
const ENV_KEY_PASSWORD = "T3CODE_ANDROID_KEY_PASSWORD";

const RELEASE_SIGNING_CONFIG = `
        release {
            if (System.getenv("${ENV_KEYSTORE_FILE}")) {
                storeFile file(System.getenv("${ENV_KEYSTORE_FILE}"))
                storePassword System.getenv("${ENV_KEYSTORE_PASSWORD}")
                keyAlias System.getenv("${ENV_KEY_ALIAS}")
                keyPassword System.getenv("${ENV_KEY_PASSWORD}")
            }
        }
`;

// Signed when the keystore is present, debug-signed otherwise. Never unsigned:
// an unsigned release APK cannot be installed at all.
const RELEASE_SIGNING_ASSIGNMENT = `signingConfig System.getenv("${ENV_KEYSTORE_FILE}") ? signingConfigs.release : signingConfigs.debug`;

const DEBUG_BLOCK_END = `            keyPassword 'android'
        }
    }
    buildTypes {`;

const TEMPLATE_RELEASE_HEADER = `        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug`;

function requireAnchor(contents, anchor, description) {
  if (!contents.includes(anchor)) {
    throw new Error(
      `withAndroidReleaseSigning: could not find ${description} in app/build.gradle — the Expo template changed; update the plugin anchors.`,
    );
  }
}

module.exports = function withAndroidReleaseSigning(config) {
  return withAppBuildGradle(config, (nextConfig) => {
    let contents = nextConfig.modResults.contents;
    if (contents.includes("signingConfigs.release")) {
      return nextConfig;
    }

    requireAnchor(contents, DEBUG_BLOCK_END, "the debug signingConfig closing brace");
    contents = contents.replace(
      DEBUG_BLOCK_END,
      `            keyPassword 'android'
        }
${RELEASE_SIGNING_CONFIG}    }
    buildTypes {`,
    );

    requireAnchor(contents, TEMPLATE_RELEASE_HEADER, "the release buildType header");
    contents = contents.replace(
      TEMPLATE_RELEASE_HEADER,
      `        release {
            // Signed with the project keystore when CI provides one (CLAUDE.md 0.10);
            // the debug key only stands in for local builds.
            ${RELEASE_SIGNING_ASSIGNMENT}`,
    );

    nextConfig.modResults.contents = contents;
    return nextConfig;
  });
};
