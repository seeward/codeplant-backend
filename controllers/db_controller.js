const datastore = require("nedb_node_util");

const _db = datastore();
const _db2 = datastore();
const _db3 = datastore();
const _db4 = datastore();
const _db5 = datastore();
const _db6 = datastore();
const _db7 = datastore();
const _db8 = datastore();
const _db9 = datastore();
const _db10 = datastore();

_db.init("website_db", "controllers/dbs");
_db2.init("live_db", "controllers/dbs");
_db3.init("archive_db", "controllers/dbs");
_db4.init("users_db", "controllers/dbs");
_db5.init("registrations_db", "controllers/dbs");
_db6.init("messages_db", "controllers/dbs");
_db7.init("code_db", "controllers/dbs");
_db8.init("log_db", "controllers/dbs");
_db10.init("errors_db", "controllers/dbs");
_db9.init("questions_db", "controllers/dbs");

module.exports = {
  isLive: async streamId => {
    if (streamId) {
      streamId._id =
        "LIVE_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      let newS = await _db2.setObject(streamId);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  notLive: async streamId => {
    _db2.clearDB();
  },
  liveStatus: async () => {
    let streams = await _db2.getQuery({});

    if (streams.error) {
      return false;
    }
    let filtered = [];
    streams.forEach(function(eachOne) {
      if (eachOne._id.split("_")[0] === "LIVE") {
        filtered.push(eachOne);
      }
    });
    if (filtered.length === 0) {
      return false;
    } else {
      return filtered[0];
    }
  },
  log: async log => {
    console.log(log);

    if (log) {
      log._id =
        "LOG_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      log.createdAt = new Date();
      let newS;

      if (log.type === "ERROR") {
        newS = await _db10.setObject(log);
      } else {
        newS = await _db8.setObject(log);
      }

      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  question: async question => {
    console.log(question);
    if (question) {
      question._id =
        "QUESTION_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      question.createdAt = new Date();
      let newS = await _db9.setObject(question);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  fetchAllQuestions: async (query = {}) => {
    let logs = await _db9.getQuery(query);

    if (logs.error) {
      return false;
    }

    return logs;
  },
  fetchAllLogs: async (query = {}) => {
    let logs = await _db8.getQuery(query);

    if (logs.error) {
      return false;
    }

    return logs;
  },
  fetchErrorLogs: async (query = {}) => {
    let logs = await _db10.getQuery(query);

    if (logs.error) {
      return false;
    }

    return logs;
  },
  user: async user => {
    console.log(user);

    if (user) {
      user._id =
        "USER_" +
        Math.random()
          .toString(36)
          .substr(2, 9);

      let data = `${user._id}:${user.name}:codeplant.co.za`;
      let base64data = Buffer.from(data).toString("base64");
      user.accesskey = base64data;
      let newS = await _db4.setObject(user);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  fetchAllCode: async () => {
    let codes = await _db7.getQuery({});

    if (codes.error) {
      return false;
    }
    let filtered = [];
    codes.forEach(function(eachOne) {
      if (eachOne._id.split("_")[0] === "CODE") {
        filtered.push(eachOne);
      }
    });
    //console.log(filtered);
    return filtered;
  },
  code: async code => {
    console.log(code);

    if (code) {
      code._id =
        "CODE_" +
        Math.random()
          .toString(36)
          .substr(2, 9);

      let newS = await _db7.setObject(code);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  addNewEmail: async email => {
    if (email) {
      email._id = this.createId;
      let newS = await _db.setObject(email);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  fetchAllUsers: async () => {
    let users = await _db4.getQuery({});

    if (users.error) {
      return false;
    }
    let filtered = [];
    users.forEach(function(eachOne) {
      if (eachOne._id.split("_")[0] === "USER") {
        filtered.push(eachOne);
      }
    });
    //console.log(filtered);
    return filtered;
  },
  fetchUser: async id => {
    let users = await _db4.getQuery({ name: id });

    if (users.error) {
      return false;
    }
    let filtered = [];
    users.forEach(function(eachOne) {
      if (eachOne._id.split("_")[0] === "USER") {
        filtered.push(eachOne);
      }
    });
    //console.log(filtered);
    return filtered;
  },
  addBadgeToUser: async (id, badge) => {
    // console.log(id)
    let user = await _db4.getQuery({ name: id });
    if (user.error) {
      return false;
    }
    
    if (!user[0].hasOwnProperty("badges")) {
      user[0].badges = [];
    }
    console.log(user[0].badges);
    
    if(user[0].badges.indexOf(badge.badge) === -1){
      user[0].badges.push(badge.badge);
    }
    
    //console.log(user[0])

    await _db4.updateObject({ name: id }, user[0]);

    return true;
  },
  updateUser: async (id, update) => {
    let user = await _db4.getQuery({ name: id });

    if (user.error) {
      return false;
    }
    let copy = user;
    Object.keys(update).forEach(eachKey => {
      copy[eachKey] = update[eachKey];
    });

    await _db4.updateObject({ _id: user._id }, copy);

    return true;
  },
  register: async registration => {
    if (registration) {
      registration.email_confirmed = false;
      registration.verfied_admin_fee = false;
      registration.paid_registration_fee = false;
      // CREATED -> inital state when first submitted
      // CONFIRMED -> updated state after reviewing info
      // REGISTERED -> updated state after EFT for 1 month R550 + admin fee R50 = R600
      // SUBSCRIBED -> paid for current month's sessions
      registration.status = "CREATED";
      registration._id =
        "REGISTRATION_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      let newS = await _db5.setObject(registration);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  updateRegistration: async updatedReg => {
    if (updatedReg) {
      return await _db.updateObject(updatedReg);
    }
    return false;
  },
  message: async message => {
    if (message) {
      message.replied = false;
      message._id =
        "MESSAGE_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      let newS = await _db6.setObject(message);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  exercise: async exercise => {
    console.log(exercise);
    if (exercise) {
      exercise._id =
        "EXERCISE_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      let newS = await _db.setObject(exercise);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  fetchAllArchiveExercises: async () => {
    let exercises = await _db.getQuery({});

    if (exercises.error) {
      return false;
    }
    let filtered = [];
    exercises.forEach(function(eachOne) {
      if (eachOne._id.split("_")[0] === "EXERCISE") {
        filtered.push(eachOne);
      }
    });
    //console.log(filtered);
    return filtered;
  },
  stream: async stream => {
    console.log(stream);
    if (stream) {
      stream._id =
        "ARCHIVE_" +
        Math.random()
          .toString(36)
          .substr(2, 9);
      let newS = await _db3.setObject(stream);
      if (newS.error) {
        return false;
      }
      return newS;
    }
  },
  fetchAllArchiveStreams: async () => {
    let streams = await _db3.getQuery({});

    if (streams.error) {
      return false;
    }
    let filtered = [];
    streams.forEach(function(eachOne) {
      if (eachOne._id.split("_")[0] === "ARCHIVE") {
        filtered.push(eachOne);
      }
    });
    //console.log(filtered);
    return filtered;
  },
  fetchAllRegistrations: async () => {
    let regs = await _db5.getQuery({});
    if (regs.error) {
      return false;
    }
    let filtered = [];
    regs.forEach(function(eachOne) {
      if (eachOne._id.split("_")[0] === "REGISTRATION") {
        filtered.push(eachOne);
      }
    });
    return filtered;
  },
  fetchAllMessages: async () => {
    let regs = await _db6.getQuery({});
    if (regs.error) {
      return false;
    }
    let filtered = [];
    regs.forEach(function(eachOne) {
      if (eachOne._id.split("_")[0] === "MESSAGE") {
        filtered.push(eachOne);
      }
    });
    return filtered;
  },
  createId: function() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  },
  clearDB: () => {
    _db.clearDB();
  }
};
