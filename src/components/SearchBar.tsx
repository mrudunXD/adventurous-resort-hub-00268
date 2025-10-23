import { useState } from "react";
import { Search, FileText, BookOpen, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResult {
  id: string;
  type: "contract" | "learning" | "market";
  title: string;
  description: string;
  url: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "contract",
    title: "Contract #C12345",
    description: "Soybean delivery contract - 10 quintals",
    url: "/contracts",
  },
  {
    id: "2",
    type: "learning",
    title: "Hedging Basics",
    description: "Learn the fundamentals of price hedging",
    url: "/learning",
  },
  {
    id: "3",
    type: "market",
    title: "Soybean Market Analysis",
    description: "Current market trends and forecasts",
    url: "/market-forecast",
  },
  {
    id: "4",
    type: "contract",
    title: "Contract #C12346",
    description: "Mustard seed contract - 5 quintals",
    url: "/contracts",
  },
  {
    id: "5",
    type: "learning",
    title: "Sustainable Farming",
    description: "Best practices for sustainable agriculture",
    url: "/learning",
  },
];

const SearchBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = mockResults.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleResultClick = (url: string) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    navigate(url);
  };

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "contract":
        return <FileText className="h-4 w-4" />;
      case "learning":
        return <BookOpen className="h-4 w-4" />;
      case "market":
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hidden sm:flex"
          data-testid="button-search"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm text-muted-foreground hidden md:inline">Quick search...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 lg:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          data-testid="button-search-mobile"
        >
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Quick Search</DialogTitle>
          <DialogDescription>
            Search across contracts, learning modules, and market data
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Type to search..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
            data-testid="input-search-query"
            autoFocus
          />
          <ScrollArea className="h-[300px]">
            {results.length === 0 && query !== "" && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No results found
              </div>
            )}
            {results.length === 0 && query === "" && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Start typing to search...
              </div>
            )}
            <div className="flex flex-col gap-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors text-left w-full"
                  onClick={() => handleResultClick(result.url)}
                  data-testid={`search-result-${result.id}`}
                >
                  <div className="mt-1 text-muted-foreground">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{result.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {result.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
