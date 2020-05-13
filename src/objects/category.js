/**
const categoryTemplate = {
  "pam_unix(sshd:auth):": {

  },
  "pam_unix(sshd:session):": {

  },
  "pam_syno_log_fail(sshd:auth):": {
    user: ""
  },
  "sysnotify_send_notification.c:599": {
    WIP: null
  },
  "smtp.c": {
    WIP: null
  },
  "mail_smtp_error_call_back.c": {
    WIP: null
  },
  "autoblock_db_release_expired.c:37": {
    WIP: null
  },
  "autoblock_fail_login_set.c:164": {
    WIP: null
  },
  "pam_ldap(sshd:auth):": {
    user: ""
  }
}
 */

/**
 
    fillDescription: function(info) {
      if (entry.category == "pam_unix(sshd:session)") {
        let desc_uid_token = "user ";
        let desc_end_token = " by (uid=0)";
        let lookForUid = entry.description.indexOf(desc_uid_token);
        if (lookForUid >= 0) {
          entry.uid = entry.description.substring(
            lookForUid + desc_uid_token.length,
            entry.description.length -
              (entry.description.indexOf(desc_end_token) >= 0
                ? desc_end_token.length
                : 0)
          );
        }
      } else if (entry.category == "pam_syno_log_fail(sshd:auth)") {
        let desc_uid_token = "uid (";
        let desc_end_token = ").";
        let lookForUid = entry.description.indexOf(desc_uid_token);
        if (lookForUid >= 0) {
          entry.uid = entry.description.substring(
            lookForUid + desc_uid_token.length,
            entry.description.length -
              (entry.description.indexOf(desc_end_token) >= 0
                ? desc_end_token.length
                : 0)
          );
        }
      } else if (entry.category == "pam_syno_log_fail(ftpd:auth)") {
        let desc_uid_token = "uid (";
        let desc_end_token = ").";
        let lookForUid = entry.description.indexOf(desc_uid_token);
        if (lookForUid >= 0) {
          entry.uid = entry.description.substring(
            lookForUid + desc_uid_token.length,
            entry.description.length -
              (entry.description.indexOf(desc_end_token) >= 0
                ? desc_end_token.length
                : 0)
          );
        }
      }
    },
 */

const setCategoryData = (entry, category, info) => {
  let result = true;
  entry.category = category;
  entry.data = info;
  return result;
}

export default setCategoryData;
