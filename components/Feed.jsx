"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, id) => (
        <PromptCard post={post} key={id} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const { data } = useSession();
  const fetchAll = async () => {
    try {
      const response = await fetch(`/api/prompt/get?id=${data?.user?.id}`);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setPosts(jsonData);
      } else {
        console.log("Response not OK:", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          value={searchText}
          required
          onChange={handleSearchChange}
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
