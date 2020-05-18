const parseCategory = (entry, category, info) => {
  let result = true;
  switch (category) {
    case "pam_unix(sshd:auth):": {
      if (info.startsWith("bad username [")) {
        // Test bad username.

        entry.user = info.substring("bad username [".length, info.length - 1);
      } else {
        // Normal case

        try {
          entry.description = info.substring(0, info.indexOf("; "));

          let possibly_rhost_user = info.substring(info.indexOf("rhost=") + "rhost=".length);
          let lookForUser = possibly_rhost_user.indexOf("user=");

          if (lookForUser >= 0) {
            entry.rhost = possibly_rhost_user.substring(0, lookForUser).trim(); // Remove whitespaces.
            entry.user = possibly_rhost_user.substring(lookForUser + "user=".length);
          } else {
            entry.rhost = possibly_rhost_user;
          }
        } catch (err) {
          result = false;
        }
      }
      break;
    }
    case "pam_unix(ftpd:auth):": {
      if (info.startsWith("bad username [")) {
        // Test bad username.

        entry.user = info.substring("bad username [".length, info.length - 1);
      } else {
        // Normal case

        try {
          entry.description = info.substring(0, info.indexOf("; "));

          let possibly_rhost_user = info.substring(info.indexOf("rhost=") + "rhost=".length);
          let lookForUser = possibly_rhost_user.indexOf("user=");

          if (lookForUser >= 0) {
            entry.rhost = possibly_rhost_user.substring(0, lookForUser).trim(); // Remove whitespaces.
            entry.user = possibly_rhost_user.substring(lookForUser + "user=".length);
          } else {
            entry.rhost = possibly_rhost_user;
          }
        } catch (err) {
          result = false;
        }
      }
      break;
    }
    case "pam_unix(sshd:session):": {
      try {
        let desc_user_token = "user ";
        let desc_end_token = " by (uid=0)";
        let lookForUser = info.indexOf(desc_user_token);
        if (lookForUser >= 0) {
          entry.user = info.substring(lookForUser + desc_user_token.length, info.length - (info.indexOf(desc_end_token) >= 0 ? desc_end_token.length : 0));
        } else {
          result = false;
        }
      } catch (err) {
        result = false;
      }
      break;
    }
    case "pam_syno_log_fail(sshd:auth):": {
      try {
        let desc_user_token = "Can't get user uid (";
        let desc_end_token = ").";
        let lookForUser = info.indexOf(desc_user_token);
        if (lookForUser >= 0) {
          entry.user = info.substring(lookForUser + desc_user_token.length, info.length - desc_end_token.length);
        } else {
          result = false;
        }
      } catch (err) {
        result = false;
      }
      break;
    }
    case "pam_syno_log_fail(ftpd:auth):": {
      try {
        let desc_user_token = "Can't get user uid (";
        let desc_end_token = ").";
        let lookForUser = info.indexOf(desc_user_token);
        if (lookForUser >= 0) {
          entry.user = info.substring(lookForUser + desc_user_token.length, info.length - desc_end_token.length);
        } else {
          result = false;
        }
      } catch (err) {
        result = false;
      }
      break;
    }
    case "sysnotify_send_notification.c:599": {
      // WIP
      result = false;
      break;
    }
    case "smtp.c": {
      // WIP
      result = false;
      break;
    }
    case "mail_smtp_error_call_back.c": {
      // WIP
      result = false;
      break;
    }
    case "autoblock_db_release_expired.c:37": {
      // WIP
      result = false;
      break;
    }
    case "autoblock_fail_login_set.c:164": {
      // WIP
      result = false;
      break;
    }
    case "pam_ldap(sshd:auth):": {
      // WIP
      result = false;
      break;
    }
    case "user_get.c:92": {
      // WIP
      result = false;
      break;
    }
    case "user_get_real_name.c:48": {
      // WIP
      result = false;
      break;
    }
    case "pam_unix(su:session):": {
      // WIP
      result = false;
      break;
    }
    default: {
      // Matches no category. Unknown category.
      result = false;
      break;
    }
  }

  return result;
}

const setCategoryData = (entry, category, info) => {
  let result = true;
  entry.category = category;

  // Trim info left and right.
  result = parseCategory(entry, category, info.trim());

  return result;
}

export default setCategoryData;
