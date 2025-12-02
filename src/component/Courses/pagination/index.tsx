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
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || totalPages <= 1}
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Prev
      </Button>

      {/* Page Numbers: show first, a window around current, and last with ellipses */}
      {(() => {
        if (totalPages <= 1) return null

        const pages: (number | "...")[] = []

        const left = Math.max(2, currentPage - 2)
        const right = Math.min(totalPages - 1, currentPage + 2)

        // Always show first
        pages.push(1)

        if (left > 2) {
          pages.push("...")
        }

        for (let p = left; p <= right; p++) {
          pages.push(p)
        }

        if (right < totalPages - 1) {
          pages.push("...")
        }

        if (totalPages > 1) pages.push(totalPages)

        return (
          <>
            {pages.map((page, idx) =>
              page === "..." ? (
                <span key={`e-${idx}`} className="px-2 text-muted-foreground">…</span>
              ) : (
                <Button
                  key={page}
                  size="sm"
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => onPageChange(Number(page))}
                  className={currentPage === page ? "bg-purple-600 hover:bg-purple-700 text-white" : ""}
                >
                  {page}
                </Button>
              )
            )}
          </>
        )
      })()}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || totalPages <= 1}
        className="gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}