#include <algorithm>
#include <cstdint>
#include <iostream>
#include <unordered_set>

constexpr int gridWidth = 5;
constexpr int gridHeight = 5;
typedef uint_fast32_t ratingType;

static_assert(
	sizeof(ratingType) >= (gridWidth * gridHeight + 7) / 8,
	"The rating type is not large enough"
);

void step(bool grid[gridHeight][gridWidth]) {
	static constexpr int neighbors[4][2] = {
		{-1, 0},
		{1, 0},
		{0, -1},
		{0, 1},
	};
	
	bool previous[gridHeight][gridWidth];
	std::copy(*grid, *grid + (gridHeight * gridWidth), *previous);
	
	for (int y = 0; y < gridHeight; ++y) {
		for (int x = 0; x < gridWidth; ++x) {
			size_t neighborsAlive = 0;
			for (size_t i = 0; i < 4; ++i) {
				int nx = x + neighbors[i][0];
				int ny = y + neighbors[i][1];
				
				if (nx < 0 || nx >= gridWidth || ny < 0 || ny >= gridHeight) {
					continue;
				}
				if (previous[ny][nx]) {
					++neighborsAlive;
				}
			}
			
			if (previous[y][x] && neighborsAlive != 1) {
				grid[y][x] = false;
			} else if (!previous[y][x] && (neighborsAlive == 1 || neighborsAlive == 2)) {
				grid[y][x] = true;
			}
		}
	}
}

ratingType getRating(bool grid[gridHeight][gridWidth]) {
	ratingType rating = 0;
	for (int y = 0; y < gridHeight; ++y) {
		for (int x = 0; x < gridWidth; ++x) {
			if (grid[y][x]) {
				rating |= 1 << (y * gridWidth + x);
			}
		}
	}
	return rating;
}

int main() {
	bool grid[gridHeight][gridWidth];
	
	for (int y = 0; y < gridHeight; ++y) {
		for (int x = 0; x < gridWidth; ++x) {
			int c;
			do {
				c = std::cin.get();
			} while (c != '.' && c != '#' && !std::cin.eof());
			grid[y][x] = (c == '#');
		}
	}
	
	std::unordered_set<ratingType> states;
	
	while (true) {
		ratingType rating = getRating(grid);
		if (states.count(rating)) {
			break;
		}
		
		states.insert(rating);
		step(grid);
	}
	
	std::cout << getRating(grid) << std::endl;
	
	return 0;
}
