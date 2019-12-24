#include <iostream>
#include <set>
#include <vector>

struct Bug {
	int x;
	int y;
	int z;
	
	bool operator<(const Bug &other) const {
		if (z != other.z) {
			return z < other.z;
		}
		if (y != other.y) {
			return y < other.y;
		}
		return x < other.x;
	}
};

std::vector<Bug> getNeighbors(const Bug &bug) {
	static constexpr int directions[4][2] = {
		{-1, 0},
		{1, 0},
		{0, -1},
		{0, 1},
	};
	
	std::vector<Bug> neighbors;
	for (size_t i = 0; i < 4; ++i) {
		int x = bug.x + directions[i][0];
		int y = bug.y + directions[i][1];
		
		if (x < 0) {
			neighbors.push_back({1, 2, bug.z - 1});
		} else if (x >= 5) {
			neighbors.push_back({3, 2, bug.z - 1});
		} else if (y < 0) {
			neighbors.push_back({2, 1, bug.z - 1});
		} else if (y >= 5) {
			neighbors.push_back({2, 3, bug.z - 1});
		} else if (x == 2 && y == 2) {
			for (int j = 0; j < 5; ++j) {
				if (i == 0) {
					neighbors.push_back({4, j, bug.z + 1});
				} else if (i == 1) {
					neighbors.push_back({0, j, bug.z + 1});
				} else if (i == 2) {
					neighbors.push_back({j, 4, bug.z + 1});
				} else if (i == 3) {
					neighbors.push_back({j, 0, bug.z + 1});
				}
			}
		} else {
			neighbors.push_back({x, y, bug.z});
		}
	}
	
	return neighbors;
}

void step(std::set<Bug> &bugs) {
	std::set<Bug> previous = bugs;
	
	int minLevel = 0;
	int maxLevel = 0;
	
	for (const Bug &bug : bugs) {
		if (bug.z - 1 < minLevel) {
			minLevel = bug.z - 1;
		}
		if (bug.z + 1 > maxLevel) {
			maxLevel = bug.z + 1;
		}
	}
	
	for (int z = minLevel; z <= maxLevel; ++z) {
		for (int y = 0; y < 5; ++y) {
			for (int x = 0; x < 5; ++x) {
				if (x == 2 && y == 2) {
					continue;
				}
				auto neighbors = getNeighbors({x, y, z});
				
				size_t neighborsAlive = 0;
				for (const Bug &neighbor : neighbors) {
					if (previous.count(neighbor)) {
						++neighborsAlive;
					}
				}
				
				bool alive = previous.count({x, y, z});
				if (alive && neighborsAlive != 1) {
					bugs.erase({x, y, z});
				} else if (!alive && (neighborsAlive == 1 || neighborsAlive == 2)) {
					bugs.insert({x, y, z});
				}
			}
		}
	}
}

int main() {
	std::set<Bug> bugs;
	
	for (int y = 0; y < 5; ++y) {
		for (int x = 0; x < 5; ++x) {
			int c;
			do {
				c = std::cin.get();
			} while (c != '.' && c != '#' && !std::cin.eof());
			if (c == '#') {
				bugs.insert({x, y, 0});
			}
		}
	}
	
	for (size_t i = 0; i < 200; ++i) {
		step(bugs);
	}
	
	std::cout << bugs.size() << std::endl;
	
	return 0;
}
