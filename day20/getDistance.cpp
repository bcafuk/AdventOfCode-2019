#include <queue>

#include "day20.hpp"

size_t getDistance(const Maze &maze, bool useLevels) {
	const Position directions[4] = {
		{-1, 0, 0},
		{1, 0, 0},
		{0, -1, 0},
		{0, 1, 0},
	};

	std::queue<Position> queue;
	std::map<Position, size_t> distances;

	queue.push(maze.m_start);
	distances.insert({maze.m_start, 0});

	while (!queue.empty()) {
		Position pos = queue.front();
		queue.pop();

		if (pos == maze.m_end) {
			break;
		}

		std::vector<Position> neighbors;
		for (size_t i = 0; i < 4; ++i) {
			if (maze(pos + directions[i]) == '.') {
				neighbors.push_back(pos + directions[i]);
			}
		}
		if (maze.m_portals.count({pos.x, pos.y, 0})) {
			Position destination = maze.m_portals.at({pos.x, pos.y, 0});
			destination.z += pos.z;

			if (useLevels) {
				bool outerEdge = (
					pos.x == 2 ||
					pos.x == maze.m_width - 3 ||
					pos.y == 2 ||
					pos.y == maze.m_height - 3
				);

				if (outerEdge) {
					--destination.z;
				} else {
					++destination.z;
				}
			}

			if (destination.z >= 0) {
				neighbors.push_back(destination);
			}
		}

		for (const auto &neighbor : neighbors) {
			if (distances.count(neighbor)) {
				continue;
			}
			distances.insert({neighbor, distances.at(pos) + 1});
			queue.push(neighbor);
		}
	}

	return distances.at(maze.m_end);
}
