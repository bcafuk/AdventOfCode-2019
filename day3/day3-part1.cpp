#include <algorithm>
#include <cstdlib>
#include <iostream>
#include <vector>

struct Point {
	int x;
	int y;
	
	int manhattan() const {
		return abs(x) + abs(y);
	}
	
	bool operator<(const Point &other) const {
		if (x == 0 && y == 0) {
			return false;
		}
		if (other.x == 0 && other.y == 0) {
			return true;
		}
		
		return manhattan() < other.manhattan();
	}
};

struct LineSegment {
	int m_x1;
	int m_y1;
	int m_x2;
	int m_y2;
	
	Point intersect(const LineSegment &other) const {
		if (m_x1 > other.m_x2 || other.m_x1 > m_x2) {
			return {0, 0};
		}
		if (m_y1 > other.m_y2 || other.m_y1 > m_y2) {
			return {0, 0};
		}
		
		int overlapX1 = std::max(m_x1, other.m_x1);
		int overlapY1 = std::max(m_y1, other.m_y1);
		int overlapX2 = std::min(m_x2, other.m_x2);
		int overlapY2 = std::min(m_y2, other.m_y2);
		
		Point intersection = std::min(std::initializer_list<Point>{
			{overlapX1, overlapY1},
			{overlapX1, overlapY2},
			{overlapX2, overlapY1},
			{overlapX2, overlapY2},
		});
		
		return intersection;
	}
};

void readWire(std::vector<LineSegment> &wire) {
	Point p = {0, 0};
	
	while (true) {
		char c;
		std::cin >> c;
		
		int d;
		std::cin >> d;
		
		switch(c) {
			case 'R':
				wire.push_back({p.x, p.y, p.x + d, p.y});
				p.x += d;
				break;
			case 'L':
				wire.push_back({p.x - d, p.y, p.x, p.y});
				p.x -= d;
				break;
			case 'D':
				wire.push_back({p.x, p.y, p.x, p.y + d});
				p.y += d;
				break;
			case 'U':
				wire.push_back({p.x, p.y - d, p.x, p.y});
				p.y -= d;
				break;
		}
		
		std::cin >> c;
		if (std::cin.eof()) {
			return;
		}
		if (c != ',') {
			std::cin.putback(c);
			return;
		}
	}
}

int main() {
	std::vector<LineSegment> wire1;
	std::vector<LineSegment> wire2;
	
	readWire(wire1);
	readWire(wire2);
	
	Point intersection = {0, 0};
	
	for (LineSegment &s1 : wire1) {
		for (LineSegment &s2 : wire2) {
			intersection = std::min(intersection, s1.intersect(s2));
		}
	}
	
	std::cerr << "(" << intersection.x << "," << intersection.y << ")" << std::endl;
	std::cout << intersection.manhattan() << std::endl;
	
	return 0;
}
