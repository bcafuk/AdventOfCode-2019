#include <queue>
#include <string>

#include "day20.hpp"

Maze load(std::istream &stream) {
	const std::string startPortal = "AA";
	const std::string endPortal = "ZZ";

	Maze maze{0, 0};

	while (true) {
		std::string line;
		std::getline(stream, line);

		if (stream.eof()) {
			break;
		}

		maze.m_width = line.size();
		++maze.m_height;
		maze.m_grid.insert(maze.m_grid.end(), line.begin(), line.end());
	}

	std::map<std::string, Position> portals;

	auto link = [&portals, &maze](const std::string &name, Position pos) {
		auto it = portals.find(name);

		if (it == portals.end()) {
			portals.insert({name, pos});
		} else {
			maze.m_portals.insert({it->second, pos});
			maze.m_portals.insert({pos, it->second});
			portals.erase(it);
		}
	};

	for (int y = 0; y < maze.m_height; ++y) {
		for (int x = 0; x < maze.m_width; ++x) {
			if (maze(x, y) >= 'A' && maze(x, y) <= 'Z') {
				std::string portalName;
				portalName += maze(x, y);

				if (maze(x + 1, y) >= 'A' && maze(x + 1, y) <= 'Z') {
					portalName += maze(x + 1, y);
					if (maze(x + 2, y) == '.') {
						link(portalName, {x + 2, y, 0});
					} else if (maze(x - 1, y) == '.') {
						link(portalName, {x - 1, y, 0});
					}
				} else if (maze(x, y + 1) >= 'A' && maze(x, y + 1) <= 'Z') {
					portalName += maze(x, y + 1);
					if (maze(x, y + 2) == '.') {
						link(portalName, {x, y + 2, 0});
					} else if (maze(x, y - 1) == '.') {
						link(portalName, {x, y - 1, 0});
					}
				}
			}
		}
	}

	maze.m_start = portals[startPortal];
	maze.m_start.z = 0;

	maze.m_end = portals[endPortal];
	maze.m_end.z = 0;

	return maze;
}
