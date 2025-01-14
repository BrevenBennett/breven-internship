import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const HotCollections = () => {
  AOS.init();

  const [hotCollections, setHotCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    loop: true,
    nav: true,
    dots: false,
    margin: 20,
    responsive: {
      1440: { items: 4 },
      1024: { items: 3 },
      768: { items: 2 },
      375: { items: 1 },
    },
  };

  async function fetchHotCollections() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setHotCollections(data);
    } catch (error) {
      console.error("Couldn't load", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-carousel" {...options}>
            {hotCollections.length === 0 && isLoading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-12 col-md-12 col-xs-12" key={index}>
                    <div className="nft_coll nft_coll--loading">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="90%" />
                      </div>
                      <div className="nft_coll_pp--loading">
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius={999}
                        />
                        <i className="fa fa-check fa-check__loading"></i>
                      </div>
                      <div className="nft_coll_info--loading">
                        <Skeleton width="120px" height="19.2px" />
                        <div className="margin">
                          <Skeleton width="55px" height="18.5px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : hotCollections.map((hotCollection) => (
                  <div key={hotCollection.id}>
                    <div data-aos="fade-up" className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${hotCollection.nftId}`}>
                          <img
                            src={hotCollection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${hotCollection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={hotCollection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{hotCollection.title}</h4>
                        </Link>
                        <span>ERC-{hotCollection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
