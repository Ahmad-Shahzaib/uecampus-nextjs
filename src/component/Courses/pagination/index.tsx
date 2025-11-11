"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </Button>

      {/* Page Numbers: only show 1, 2 and ellipsis when there are more pages */}
      {(() => {
        const pages: number[] = []
        if (totalPages >= 1) pages.push(1)
        if (totalPages >= 2) pages.push(2)

        return (
          <>
            {pages.map((page) => (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => onPageChange(page)}
                className={currentPage === page ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
              >
                {page}
              </Button>
            ))}

            {totalPages > pages.length && (
              <span className="px-2 text-muted-foreground">…</span>
            )}
          </>
        )
      })()}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}