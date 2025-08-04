import React, { useState, useEffect } from "react";


export const handleChangeDebounce = (search) => {
    const [searchData,setSearchData] = useState("")
    useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchData(search);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);
  return searchData;
  };