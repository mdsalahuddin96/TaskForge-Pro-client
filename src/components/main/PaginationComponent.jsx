"use client";

import {Pagination} from "@heroui/react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {useEffect, useState} from "react";

export function PaginationComponent({currentPage,totalPages, totalTasks}) {
  const [page, setPage] = useState(currentPage);
  const pathName=usePathname()
  const router=useRouter()
  const searchParams= useSearchParams()
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };
  useEffect(()=>{
    const params=new URLSearchParams(searchParams);
    params.set("page",page)
    router.push(`${pathName}?${params.toString()}`)
  },[page])
  return (
    <div className="w-full mt-5 max-w-2xs overflow-x-auto sm:max-w-full">
      <Pagination className="justify-end" >
        <Pagination.Content >
          <Pagination.Item>
            <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>
          {getPageNumbers().map((p, i) =>
            p === "ellipsis" ? (
              <Pagination.Item key={`ellipsis-${i}`}>
                <Pagination.Ellipsis />
              </Pagination.Item>
            ) : (
              <Pagination.Item key={p}>
                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ),
          )}
          <Pagination.Item>
            <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}