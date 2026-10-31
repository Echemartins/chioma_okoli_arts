"use client";
export async function adminFetch(url,options={}) {
  const response=await fetch(url,{...options,credentials:"same-origin"});
  if(response.status===401||response.status===403){
    localStorage.removeItem("token");
    const next=window.location.pathname+window.location.search;
    window.location.replace(`/login?next=${encodeURIComponent(next)}${response.status===403?"&reason=access":""}`);
    throw Error("Please sign in to continue.");
  }
  return response;
}
