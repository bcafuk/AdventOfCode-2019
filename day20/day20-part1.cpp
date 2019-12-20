#include <iostream>

#include "day20.hpp"

int main() {
	Maze maze = load(std::cin);
	std::cout << getDistance(maze, false) << std::endl;

	return 0;
}
