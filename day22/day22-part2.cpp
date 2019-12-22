#include <iostream>

#include "loadSteps.hpp"
#include "Modular.hpp"

int main() {
	constexpr uint64_t deckSize = 119315717514047;
	constexpr uint64_t iterations = 101741582076661;
	constexpr uint64_t value = 2020;

	auto steps = loadSteps(std::cin);

	Modular<deckSize> mul(1);
	Modular<deckSize> add(0);

	for (auto it = steps.rbegin(); it != steps.rend(); ++it) {
		if(it->first == 'c') {
			add += it->second;
		} else if(it->first == 'd') {
			mul /= it->second;
			add /= it->second;
		} else if(it->first == 'r') {
			mul = -mul;
			add = -add - 1;
		}
	}

	if (mul.getValue() != 1) {
		add *= (1 - (mul ^ iterations)) / (1 - mul);
	} else {
		add *= iterations;
	}
	mul ^= iterations;

	auto result = mul * value + add;
	std::cout << result.getValue() << std::endl;

	return 0;
}
