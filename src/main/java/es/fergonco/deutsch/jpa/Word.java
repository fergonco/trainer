package es.fergonco.deutsch.jpa;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Entity
public class Word {

	@Id
	private String name;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	private String plural;
	private String definition;
	private String translation;
	private boolean substantive;
	private double guessGenderFailureRate = 0.1;
	private double guessFromSpanish = 0.1;
	private double guessFromDeutch = 0.1;

	public Word() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getPlural() {
		return plural;
	}

	public void setPlural(String plural) {
		this.plural = plural;
	}

	public String getDefinition() {
		return definition;
	}

	public void setDefinition(String definition) {
		this.definition = definition;
	}

	public String getTranslation() {
		return translation;
	}

	public void setTranslation(String translation) {
		this.translation = translation;
	}

	public boolean isSubstantive() {
		return substantive;
	}

	public void setSubstantive(boolean substantive) {
		this.substantive = substantive;
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

	@Override
	public String toString() {
		return "Word [name=" + name + ", gender=" + gender + ", plural="
				+ plural + ", definition=" + definition + ", translation="
				+ translation + ", substantive=" + substantive + "]";
	}
}
