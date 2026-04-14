"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type SearchResult = {
  _id: string;
  title: string;
  body: string;
  slug?: string;
};

export function SearchInput() {
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState<SearchResult[] | undefined>(undefined);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
        setTerm(e.target.value);
        setOpen(true);
    }

    useEffect(() => {
        if (term.length < 2) {
            setResults(undefined);
            return;
        }

        const controller = new AbortController();

        const run = async () => {
            try {
                const response = await fetch(`/api/search?term=${encodeURIComponent(term)}`, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error("Search request failed");
                }

                const data = (await response.json()) as SearchResult[];
                setResults(data);
            } catch (error) {
                if ((error as Error).name === "AbortError") {
                    return;
                }

                console.error(error);
                setResults([]);
            }
        };

        setResults(undefined);
        void run();

        return () => controller.abort();
    }, [term]);

    return (
        <div className="relative w-full max-w-sm z-10">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input 
                    type="search" 
                    placeholder="Search Posts..." 
                    className="w-full pl-8 bg-background" 
                    value={term}
                    onChange={handleInputChange}
                />
            </div>
            {open && term.length >= 2 && (
                <div className="absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
                    {results === undefined ? (
                        <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                            <Loader2  className="mr-2 size-4 animate-spin"/>
                            Searching...
                        </div>
                    ): results.length === 0 ? (
                        <p className="p-4 text-sm text-muted-foreground text-center">
                            No results found
                        </p>
                    ): (
                       <div className="py-1">
                        {results.map((post) => (
                            <Link className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer" href={`/blog/${post.slug}`} key={post._id} onClick={() => { setOpen(false); setTerm(""); }}>
                                <p className="font-medium truncate">{post.title}</p>
                                <p className="text-xs text-muted-foreground pt-1">
                                    {post.body.substring(0, 60)}
                                </p>
                            </Link>
                        ))}
                       </div> 
                    )}
                </div>
            )}
        </div>
    )
}