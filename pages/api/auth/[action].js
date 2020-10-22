import auth0 from "utils/auth0";

const timeoutRegexp = new RegExp("Timeout awaiting 'request'");

async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res);
  } catch (error) {
    console.error(error);

    if (timeoutRegexp.test(error.toString())) {
      await callback(req, res);
    } else {
      res.status(error.status || 400).end(error.message);
    }
  }
}

async function login(req, res) {
  try {
    await auth0.handleLogin(req, res, { redirectTo: req.query.redirectTo || "/" });
  } catch (error) {
    console.error(error);

    if (timeoutRegexp.test(error.toString())) {
      await login(req, res);
    } else {
      res.status(error.status || 400).end(error.message);
    }
  }
}

async function logout(req, res) {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);

    if (timeoutRegexp.test(error.toString())) {
      await logout(req, res);
    } else {
      res.status(error.status || 400).end(error.message);
    }
  }
}

async function me(req, res) {
  try {
    await auth0.handleProfile(req, res, { refetch: true });
  } catch (error) {
    console.error(error);

    if (timeoutRegexp.test(error.toString())) {
      await me(req, res);
    } else {
      res.status(error.status || 500).end(error.message);
    }
  }
}

export default async function (req, res) {
  const { action } = req.query;
  switch (action) {
    case "callback":
      await callback(req, res);
      break;
    case "login":
      await login(req, res);
      break;
    case "logout":
      await logout(req, res);
      break;
    case "me":
      await me(req, res);
      break;
    default:
      res.status(404).end("Not Found");
  }
}
