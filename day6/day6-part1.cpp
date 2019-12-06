#include <iostream>
#include <string>
#include <unordered_map>

int main() {
	std::unordered_map<std::string, std::string> orbits;
	
	while (true) {
		std::string line;
		std::getline(std::cin, line);
		
		if (std::cin.eof()) {
			break;
		}
		
		size_t parenIndex = line.find(')');
		std::string parent = line.substr(0, parenIndex);
		std::string child = line.substr(parenIndex + 1);
		
		orbits.insert({child, parent});
	}
	
	size_t orbitCount = 0;
	
	for (auto &i : orbits) {
		std::string *j = &(i.second);
		while (true) {
			++orbitCount;
			try {
				j = &orbits.at(*j);
			} catch (std::out_of_range &e) {
				break;
			}
		}
	}
	
	std::cout << orbitCount << std::endl;
	
	return 0;
}
