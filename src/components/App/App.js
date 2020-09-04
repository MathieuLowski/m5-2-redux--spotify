import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import ArtistRoute from "./ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";
import { useDispatch } from "react-redux";
const DEFAULT_ARTIST_ID = "2pHk4wAmL7ofTAuvCIUWtv";

const App = () => {
  console.log("hello...");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Redirect exact from="/" to={`artist/${DEFAULT_ARTIST_ID}`} />
          <Route path="/artist/:artistId">
            <ArtistRoute />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
