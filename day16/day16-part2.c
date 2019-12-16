#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void upperHalf(int *values, size_t length) {
	size_t i = length - 1;
	while (i != 0) {
		--i;
		
		values[i] += values[i + 1];
		values[i] %= 10;
	}
}

int main() {
	const size_t stringCapacity = 1024;

	char string[stringCapacity];
	fgets(string, stringCapacity, stdin);
	strtok(string, "\n");
	
	const size_t period = strlen(string);
	const size_t length = period * 10000 / 2;
	int *values = malloc(length * sizeof(*values));
	
	for (size_t i = 0; i < period; ++i) {
		values[i] = string[i] - '0';
	}
	for (size_t i = period; i < length; ++i) {
		values[i] = values[i - period];
	}
	
	int offset = 0;
	for (size_t i = 0; i < 7; ++i) {
		offset *= 10;
		offset += values[i];
	}
	
	if (offset < length) {
		fprintf(stderr, "The offset is in the first half of the signal. Sorry :(\n");
		return 1;
	}
	
	for (size_t i = 0; i < 100; ++i) {
		upperHalf(values, length);
	}
	
	for (size_t i = 0; i < 8; ++i) {
		printf("%d", values[offset - length + i]);
	}
	printf("\n");
	
	free(values);
	
	return 0;
}
