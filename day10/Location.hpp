#ifndef AOC_2019_DAY10_LOCATION_HPP
#define AOC_2019_DAY10_LOCATION_HPP

typedef int coordinate;
struct Location {
	coordinate x;
	coordinate y;

	Location(coordinate x, coordinate y);

	void reduce();
	double phiAround(const Location &origin) const;

	bool operator<(const Location &other) const;
	bool operator==(const Location &other) const;

	bool insideRect(const Location &topLeft, const Location &bottomRight) const;

	Location operator+ (const Location &other) const;
	Location operator- (const Location &other) const;
};

#endif
