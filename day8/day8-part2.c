#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main() {
	const size_t width = 25;
	const size_t height = 6;
	char image[width * height];
	
	memset(image, '?', width * height);
	
	while (1) {
		char imageBuffer[width * height];
		fread(imageBuffer, 1, width * height, stdin);
		
		if (feof(stdin)) {
			break;
		}
		
		for (size_t i = 0; i < width * height; ++i) {
			if (image[i] != '?') {
				continue;
			}
			if (imageBuffer[i] == '0') {
				image[i] = ' ';
			} else if (imageBuffer[i] == '1') {
				image[i] = '#';
			}
		}
	}
	
	for (size_t y = 0; y < height; ++y) {
		printf("%.*s\n", width, image + y * width);
	}
	
	return 0;
}
