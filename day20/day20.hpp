#ifndef AOC_2019_DAY20_DAY20_HPP
#define AOC_2019_DAY20_DAY20_HPP

#include <istream>
#include <map>
#include <vector>

struct Position {
	int x;
	int y;
	int z;

	Position operator+(const Position &other) const;

	bool operator<(const Position &other) const;
	bool operator==(const Position &other) const;
};

struct Maze {
	int m_width;
	int m_height;
	std::vector<char> m_grid;
	std::map<Position, Position> m_portals;
	Position m_start;
	Position m_end;

	char operator()(int x, int y) const;
	char operator()(Position pos) const;
};

Maze load(std::istream &stream);
size_t getDistance(const Maze &maze, bool useLevels);

#endif
