import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass the query to the parent
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for a movie"
        className="p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
