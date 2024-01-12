import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import ItemCard from "../UI/ItemCard";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  async function fetchNewItems() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setNewItems(data);
      } catch (error) {
        console.error("Couldn't load", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    }
    
    useEffect(() => {
      fetchNewItems();
    }, []);

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

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <OwlCarousel className="owl-carousel" {...options}>
            {newItems.length === 0 && isLoading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-12 col-md-12 col-xs-12" key={index}>
                    <div className="nft__item nft__item--loading">
                      <div className="nft_wrap nft__wrap--loading">
                        <Skeleton width="100%" height="100%" borderRadius={1} />
                      </div>
                      <div className="nft_item_pp--loading">
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius={999}
                        />
                        <i className="fa fa-check fa-check__loading"></i>
                      </div>
                      <div className="nft__item_info">
                        <div className="margin">
                          <Skeleton width="150px" height="26px" />
                        </div>
                        <div className="margin">
                          <Skeleton width="55px" height="20px" />
                        </div>
                        <div className="nft__item_like--loading">
                          <Skeleton width="34px" height="17.5px" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : newItems.map((newItem) => (
                  <div key={newItem.id}>
                    <ItemCard item={newItem} />
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
