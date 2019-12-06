#include <iostream>
#include <queue>
#include <string>
#include <unordered_map>
#include <unordered_set>

int main() {
	const std::string start = "YOU";
	const std::string end = "SAN";
	
	std::unordered_map<std::string, std::unordered_set<std::string>> graph;
	
	while (true) {
		std::string line;
		std::getline(std::cin, line);
		
		size_t parenIndex = line.find(')');
		
		if (std::cin.eof()) {
			break;
		}
		
		std::string parent = line.substr(0, parenIndex);
		std::string child = line.substr(parenIndex + 1);
		
		graph[parent].insert(child);
		graph[child].insert(parent);
	}
	
	std::unordered_map<std::string, size_t> distances;
	distances.insert({start, -2});
	
	std::queue<std::string> toVisit;
	toVisit.push(start);
	
	while(!distances.count(end)) {
		std::string vertex = toVisit.front();
		toVisit.pop();
		
		size_t distance = distances[vertex];
		
		for (auto &neighbor : graph[vertex]) {
			if (distances.count(neighbor)) {
				continue;
			}
			distances.insert({neighbor, distance + 1});
			toVisit.push(neighbor);
		}
	}
	
	std::cout << distances[end] << std::endl;
	
	return 0;
}
