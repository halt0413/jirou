import styles from "./index.module.css";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  placeholder?: string;
};

export const MapSearchBar = ({
  value,
  onChange,
  onMenuClick,
  onSearchClick,
  placeholder = "店舗を検索",
}: Props) => {
  return (
    <div className={styles.searchBar}>
      <button
        type="button"
        className={styles.iconButton}
        aria-label="menu"
        onClick={onMenuClick}
      >
        <img
            src="/humburger-menu.svg"
            alt=""
            className={styles.icon}
        />
      </button>

      <input
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        type="button"
        className={styles.iconButton}
        aria-label="search"
        onClick={onSearchClick}
      >
        <img
            src="/search.svg"
            alt=""
            className={styles.icon}
        />
      </button>
    </div>
  );
};