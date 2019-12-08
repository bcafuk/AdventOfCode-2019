#include <stdio.h>
#include <stdint.h>

int main() {
	const size_t width = 25;
	const size_t height = 6;
	
	size_t minZeroes = SIZE_MAX;
	size_t checksum;
	
	while (1) {
		char imageBuffer[width * height];
		fread(imageBuffer, 1, width * height, stdin);
		
		if (feof(stdin)) {
			break;
		}
		
		size_t digits[3] = {0, 0, 0};
		for (size_t i = 0; i < width * height; ++i) {
			if (imageBuffer[i] >= '0' && imageBuffer[i] <= '2') {
				++digits[imageBuffer[i] - '0'];
			}
		}
		if (digits[0] < minZeroes) {
			minZeroes = digits[0];
			checksum = digits[1] * digits[2];
		}
	}
	
	printf("%zu\n", checksum);
	
	return 0;
}
