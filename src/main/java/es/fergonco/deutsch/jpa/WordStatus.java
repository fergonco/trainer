package es.fergonco.deutsch.jpa;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WordStatus {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String name;
	private User user;
	private Word word;
	private double guessGenderFailureRate = 0.1;
	private double guessFromSpanish = 0.1;
	private double guessFromDeutch = 0.1;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Word getWord() {
		return word;
	}

	public void setWord(Word word) {
		this.word = word;
	}

	public double getGuessGenderFailureRate() {
		return guessGenderFailureRate;
	}

	public void setGuessGenderFailureRate(double guessGenderFailureRate) {
		this.guessGenderFailureRate = guessGenderFailureRate;
	}

	public double getGuessFromSpanish() {
		return guessFromSpanish;
	}

	public void setGuessFromSpanish(double guessFromSpanish) {
		this.guessFromSpanish = guessFromSpanish;
	}

	public double getGuessFromDeutch() {
		return guessFromDeutch;
	}

	public void setGuessFromDeutch(double guessFromDeutch) {
		this.guessFromDeutch = guessFromDeutch;
	}

}
