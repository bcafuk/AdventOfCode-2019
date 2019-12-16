#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void applyFFT(int *values, size_t length, const int *pattern, size_t patternLength) {
	for (size_t i = 0; i < length; ++i) {
		int newValue = 0;
		
		for (size_t j = 0; j < length; ++j) {
			newValue += values[j] * pattern[(j + 1) / (i + 1) % patternLength];
		}
		
		values[i] = abs(newValue) % 10;
	}
}

int main() {
	const int pattern[] = {0, 1, 0, -1};
	const size_t patternLength = sizeof(pattern) / sizeof(*pattern);
	
	const size_t stringCapacity = 1024;

	char string[stringCapacity];
	fgets(string, stringCapacity, stdin);
	strtok(string, "\n");
	
	const size_t length = strlen(string);
	int values[length];
	
	for (size_t i = 0; i < length; ++i) {
		values[i] = string[i] - '0';
	}
	
	for (size_t i = 0; i < 100; ++i) {
		applyFFT(values, length, pattern, patternLength);
	}
	
	for (size_t i = 0; i < 8; ++i) {
		printf("%d", values[i]);
	}
	printf("\n");
	
	return 0;
}
