#include "day20.hpp"

Position Position::operator+(const Position &other) const {
	return {x + other.x, y + other.y, z + other.z};
}

bool Position::operator<(const Position &other) const {
	if (z != other.z) {
		return z < other.z;
	}
	if (y != other.y) {
		return y < other.y;
	}
	return x < other.x;
}
bool Position::operator==(const Position &other) const {
	return z == other.z && y == other.y && x == other.x;
}

char Maze::operator()(int x, int y) const {
	if (x >= m_width || y >= m_height) {
		return ' ';
	}
	return m_grid[y * m_width + x];
}
char Maze::operator()(Position pos) const {
	return operator()(pos.x, pos.y);
}
