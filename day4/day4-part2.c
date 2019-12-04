#include <stdbool.h>
#include <stdio.h>

bool fitsPattern(int n) {
	bool hasDoubles = false;
	
	int groupLength = 1;
	
	int prevDigit = n % 10;
	n /= 10;
	
	while (n != 0) {
		int digit = n % 10;
		n /= 10;
		
		if (digit > prevDigit) {
			return false;
		}
		
		if (digit == prevDigit) {
			++groupLength;
		}
		
		if (digit != prevDigit || n == 0) {
			if (groupLength == 2) {
				hasDoubles = true;
			}
			groupLength = 1;
		}
		
		prevDigit = digit;
	}
	
	return hasDoubles;
}

int main() {
	int lo;
	int hi;
	size_t count = 0;
	
	scanf("%d %d", &lo, &hi);
	
	for (int n = lo; n <= hi; ++n) {
		if (fitsPattern(n)) {
			++count;
		}
	}
	
	printf("%d\n", count);
	
	return 0;
}
