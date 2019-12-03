#include <algorithm>
#include <climits>
#include <cstdlib>
#include <iostream>
#include <vector>

template <typename T> int sgn(T val) {
	return (T(0) < val) - (val < T(0));
}

struct Point {
	int x;
	int y;
	int t;
};

enum Direction {
	HORIZONTAL,
	VERTICAL,
};

struct LineSegment {
	int m_x;
	int m_y;
	int m_t;
	int m_dist;
	Direction m_dir;
	
	int intersect(const LineSegment &other) const {
		if (m_dir == other.m_dir) { // Segments are parallel
			int a1t = m_t;                           // Time of the beginning of *this
			int a2t = m_t + abs(m_dist);             // Time of the end of *this
			int b1t = other.m_t;                     // Time of the beginning of other
			int b2t = other.m_t + abs(other.m_dist); // Time of the end of other
			
			int a1p; // Position of the beginning of *this
			int a2p; // Position of the end of *this
			int b1p; // Position of the beginning of other
			int b2p; // Position of the end of other
			
			if (m_dir == HORIZONTAL) {
				if (m_y != other.m_y) {
					return INT_MAX;
				}
				// Use the X coordinate for the position variables
				a1p = m_x;
				a2p = m_x + m_dist;
				b1p = other.m_x;
				b2p = other.m_x + other.m_dist;
			} else {
				if (m_x != other.m_x) {
					return INT_MAX;
				}
				// Use the Y coordinate for the position variables
				a1p = m_y;
				a2p = m_y + m_dist;
				b1p = other.m_y;
				b2p = other.m_y + other.m_dist;
			}
			
			if (m_t == 0 && other.m_t == 0) {
				// Avoid overlap at the origin with time = 0
				a1p = sgn(m_dist);
				a1t = 1;
				b1p = sgn(other.m_dist);
				b1t = 1;
			}
			
			// Swap the beginning and end if the beginning has a greater position
			if (a1p > a2p) {
				std::swap(a1p, a2p);
				std::swap(a1t, a2t);
			}
			if (b1p > b2p) {
				std::swap(b1p, b2p);
				std::swap(b1t, b2t);
			}
			
			// Check for intersection
			if (a1p > b2p || a2p < b1p) {
				return INT_MAX;
			}
			
			// Left or top end of the intersection
			int p1 = std::min(a1p, b1p);
			int t1a = std::min(a1t + abs(p1 - a1p), a2t + abs(p1 - a2p));
			int t1b = std::min(b1t + abs(p1 - b1p), b2t + abs(p1 - b2p));
			int t1 = t1a + t1b;
			
			// Right or bottom end of the intersection
			int p2 = std::min(a2p, b2p);
			int t2a = std::min(a1t + abs(p2 - a1p), a2t + abs(p2 - a2p));
			int t2b = std::min(b1t + abs(p2 - b1p), b2t + abs(p2 - b2p));
			int t2 = t2a + t2b;
			
			return std::min(t1, t2);
			
		} else if (m_dir == HORIZONTAL) { // other is vertical
			// Check for intersection along X axis
			if (m_dist > 0) {
				if (m_x >= other.m_x || m_x + m_dist <= other.m_x) {
					return INT_MAX;
				}
			} else {
				if (m_x <= other.m_x || m_x + m_dist >= other.m_x) {
					return INT_MAX;
				}
			}
			
			// Check for intersection along Y axis
			if (other.m_dist > 0) {
				if (other.m_y >= m_y || other.m_y + other.m_dist <= m_y) {
					return INT_MAX;
				}
			} else {
				if (other.m_y <= m_y || other.m_y + other.m_dist >= m_y) {
					return INT_MAX;
				}
			}
			
			int d1 = abs(other.m_x - m_x); // Intersection distance from the beginning of *this
			int d2 = abs(m_y - other.m_y); // Intersection distance from the beginning of other
			
			return m_t + d1 + other.m_t + d2;
			
		} else { // other is horizontal, call intersect again with swapped segments
			return other.intersect(*this);
		}
	}
};

void readWire(std::vector<LineSegment> &wire) {
	Point p = {0, 0, 0};
	
	while (true) {
		char c;
		std::cin >> c;
		
		int d;
		std::cin >> d;
		
		switch(c) {
			case 'R':
				wire.push_back({p.x, p.y, p.t, d, HORIZONTAL});
				p.x += d;
				p.t += d;
				break;
			case 'L':
				wire.push_back({p.x, p.y, p.t, -d, HORIZONTAL});
				p.x -= d;
				p.t += d;
				break;
			case 'D':
				wire.push_back({p.x, p.y, p.t, d, VERTICAL});
				p.y += d;
				p.t += d;
				break;
			case 'U':
				wire.push_back({p.x, p.y, p.t, -d, VERTICAL});
				p.y -= d;
				p.t += d;
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
	
	int time = INT_MAX;
	
	for (LineSegment &s1 : wire1) {
		for (LineSegment &s2 : wire2) {
			time = std::min(time, s1.intersect(s2));
		}
	}
	
	std::cout << time << std::endl;
	
	return 0;
}
