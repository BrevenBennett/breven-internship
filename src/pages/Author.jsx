import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState([]);
  const [nft, setNft] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authorId } = useParams();

  async function fetchAuthor() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setAuthor(data);
      setNft(data.nftCollection);
    } catch (error) {
      console.error("Couldn't load", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    fetchAuthor();
  }, []);

  function changeFollow() {
    if (document.querySelector(".btn__follow").innerHTML === "Follow") {
      document.querySelector(".btn__follow").innerHTML = "Unfollow";
      author.followers += 1;
    } else {
      document.querySelector(".btn__follow").innerHTML = "Follow";
      author.followers -= 1;
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton
                            width="150px"
                            height="150px"
                            borderRadius={999}
                          />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              <Skeleton width="140px" height="30px" />
                              <span className="profile_username">
                                <Skeleton width="90px" height="20px" />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="200px" height="20px" />
                              </span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <Skeleton width="250px" height="50px" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        nft={nft}
                        author={author}
                        loading={isLoading}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                          <Link
                            to="#"
                            onClick={changeFollow}
                            className="btn-main btn__follow"
                          >
                            Follow
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        nft={nft}
                        author={author}
                        loading={isLoading}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
