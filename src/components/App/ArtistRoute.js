import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../helpers/api-helpers";

import {
  requestArtist,
  receiveArtist,
  receiveArtistError,
} from "../../actions";

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);
  console.log(accessToken);
  const id = useParams();
  const artistId = id.artistId;
  console.log(artistId);

  const dispatch = useDispatch();
  const currentArtist = useSelector((state) => state.artists.currentArtist);
  console.log(currentArtist);
  const artistStatus = useSelector((state) => state.artists.status);
  console.log(artistStatus);
  const accessStatus = useSelector((state) => state.auth.status);
  console.log(accessStatus);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtist());

    fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        dispatch(receiveArtist(data));
      })
      .catch((err) => dispatch(receiveArtistError()));
  }, [accessStatus]);

  if (currentArtist) {
    return (
      <Wrapper>
        <Pic src={currentArtist.images[1].url} />
        <Artist>{currentArtist.name}</Artist>
        <Followers>{currentArtist.followers.total} followers</Followers>
        <P>Tags</P>
        {currentArtist.genres.map((genre) => {
          return <Genre>{genre}</Genre>;
        })}
      </Wrapper>
    );
  } else return <p>loading</p>;
};

export default ArtistRoute;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
  height: 100%;
`;
const Pic = styled.img`
  width: 300px;
  border-radius: 33%;
  margin: 20px;
`;
const Artist = styled.div`
  color: white;
  margin: 20px;
  font-size: 25px;
`;
const Followers = styled.div`
  color: white;
  margin: 15px;
`;
const P = styled.p`
  color: white;
  margin: 20px;
  font-size: 20px;
`;
const Genre = styled.div`
  color: white;
  margin: 10px;
  font-size: 15px;
`;
