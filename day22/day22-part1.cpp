#include <iostream>

#include "loadSteps.hpp"
#include "Modular.hpp"

int main() {
	constexpr uint64_t deckSize = 10007;
	constexpr uint64_t value = 2019;
	
	auto steps = loadSteps(std::cin);
	
	Modular<deckSize> mul(1);
	Modular<deckSize> add(0);
	
	for (auto &step : steps) {
		if(step.first == 'c') {
			add -= step.second;
		} else if(step.first == 'd') {
			mul *= step.second;
			add *= step.second;
		} else if(step.first == 'r') {
			mul = -mul;
			add = -add - 1;
		}
	}

	auto index = mul * value + add;
	std::cout << index.getValue() << std::endl;
	
	return 0;
}
