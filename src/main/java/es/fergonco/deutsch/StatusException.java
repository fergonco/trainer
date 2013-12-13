package es.fergonco.deutsch;

import javax.servlet.ServletException;

public class StatusException extends ServletException {
	private static final long serialVersionUID = 1L;

	private int httpCode;

	public StatusException(int httpCode, String msg) {
		super(msg);
		this.httpCode = httpCode;
	}

	public int getHttpCode() {
		return httpCode;
	}

}
