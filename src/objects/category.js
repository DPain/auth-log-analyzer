const parseCategory = (entry, category, info) => {
  let result = true;
  switch (category) {
    case "pam_unix(sshd:auth):": {
      try {
        entry.description = info.substring(0, info.indexOf("; "));
        entry.rhost = info.substring(info.indexOf("rhost=") + "rhost=".length, info.length);
      } catch (err) {
        result = false;
      }
      break;
    }
    case "pam_unix(ftpd:auth):": {
      try {
        entry.description = info.substring(0, info.indexOf("; "));
        // work on this
        entry.rhost = info.substring(info.indexOf("rhost=") + "rhost=".length, info.length);
        entry.rhost = info.substring(info.indexOf("user=") + "user=".length, info.length);
      } catch (err) {
        result = false;
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
