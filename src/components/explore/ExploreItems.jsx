import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../UI/ItemCard";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const ExploreItems = () => {
  AOS.init();

  const [exploreItems, setExploreItems] = useState([]);
  const [loadItems, setLoadItems] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchExploreItemsData() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setExploreItems(data);
    } catch (error) {
      console.error("Couldn't load", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    fetchExploreItemsData();
  }, []);

  async function filterItems(value) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
      );
      setExploreItems(data);
    } catch (error) {
      console.error("Couldn't load", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }

  function loadMoreItems() {
    setLoadItems(loadItems + 4);
  };

  return (
    <>
      <div>
        <select onChange={(e) => filterItems(e.target.value)} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {isLoading
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width="100%" height="420px" borderRadius={10} />
            </div>
          ))
        : exploreItems
            .map((exploreItem) => (
              <div
                key={exploreItem.id}
                data-aos="fade-in"
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <ItemCard item={exploreItem} />
              </div>
            ))
            .slice(0, loadItems)}
      {loadItems < 16 && (
        <div className="col-md-12 text-center">
          <Link
            onClick={loadMoreItems}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
