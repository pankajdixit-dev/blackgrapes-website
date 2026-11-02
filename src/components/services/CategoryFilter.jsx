import React from 'react';

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  categoryCounts 
}) {
  return (
    <div className="black-filter-bar">
      <div className="content-wrapper">
        <div className="black-filter-scroll">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                type="button"
                className={`black-filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span>{cat.label}</span>
                {count > 0 && (
                  <span className="pill-counter">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
