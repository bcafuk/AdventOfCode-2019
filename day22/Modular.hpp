#ifndef AOC_2019_DAY22_MODULAR_HPP
#define AOC_2019_DAY22_MODULAR_HPP

#include <cstdint>

template<int64_t modulo>
class Modular {
public:
	Modular(int64_t value) {
		static_assert(modulo >= 2, "The modulo cannot be less than 2");

		value %= modulo;
		if (value < 0) {
			value += modulo;
		}
		m_value = value;
	}
	int64_t getValue() const {
		return m_value;
	}

	Modular<modulo> &operator+=(const Modular<modulo> &other) {
		m_value += other.m_value;
		m_value %= modulo;
		return *this;
	}
	Modular<modulo> &operator-=(const Modular<modulo> &other) {
		m_value += modulo - other.m_value;
		m_value %= modulo;
		return *this;
	}
	Modular<modulo> &operator*=(const Modular<modulo> &other) {
		int64_t a = m_value;
		int64_t b = other.m_value;

		m_value = 0;

		while (b > 0) {
			if (b % 2 == 1) {
				m_value += a;
				m_value %= modulo;
			}

			a = 2 * a % modulo;
			b /= 2;
		}

		return *this;
	}
	Modular<modulo> &operator/=(const Modular<modulo> &other) {
		operator*=(~other);
		return *this;
	}
	Modular<modulo> &operator^=(const Modular<modulo> &other) {
		Modular<modulo> a(*this);
		int64_t b = other.m_value;

		m_value = 1;

		while (b > 0) {
			if (b % 2 == 1) {
				operator*=(a);
			}

			a *= a;
			b /= 2;
		}

		return *this;
	}

	Modular<modulo> operator-() const {
		return Modular<modulo>(modulo - m_value);
	}
	friend Modular<modulo> operator~(Modular<modulo> number) {
		number ^= (modulo - 2);
		return number;
	}

	friend Modular<modulo> operator+(Modular<modulo> first, const Modular<modulo> &second) {
		first += second;
		return first;
	}
	friend Modular<modulo> operator-(Modular<modulo> first, const Modular<modulo> &second) {
		first -= second;
		return first;
	}
	friend Modular<modulo> operator*(Modular<modulo> first, const Modular<modulo> &second) {
		first *= second;
		return first;
	}
	friend Modular<modulo> operator/(Modular<modulo> first, const Modular<modulo> &second) {
		first /= second;
		return first;
	}
	friend Modular<modulo> operator^(Modular<modulo> first, const Modular<modulo> &second) {
		first ^= second;
		return first;
	}

private:
	int64_t m_value;
};

#endif
