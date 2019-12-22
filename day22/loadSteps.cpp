#include "loadSteps.hpp"

#include <regex>
#include <string>

std::vector<std::pair<char, int>> loadSteps(std::istream &stream) {
	static const std::regex cut("cut (-?\\d+)");
	static const std::regex deal("deal with increment (\\d+)");
	static const std::string reverse("deal into new stack");

	std::vector <std::pair<char, int>> steps;

	while (true) {
		std::string line;
		std::getline(stream, line);

		if (stream.eof()) {
			break;
		}

		std::smatch matches;

		if (std::regex_search(line, matches, cut) && matches.size() > 1) {
			int offset = stoi(matches[1].str());
			steps.emplace_back('c', offset);
		} else if (std::regex_search(line, matches, deal) && matches.size() > 1) {
			int offset = stoi(matches[1].str());
			steps.emplace_back('d', offset);
		} else if (line == reverse) {
			steps.emplace_back('r', 0);
		} else {
			throw std::runtime_error("Unknown technique");
		}
	}
	return steps;
}
