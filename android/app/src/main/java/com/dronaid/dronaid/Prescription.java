package com.dronaid.dronaid;

/**
 * Created by darthvader on 13/3/18.
 */

public class Prescription {
    String medicines;
    String dosage;
    int noofdays;

    public String getMedicines() {
        return medicines;
    }

    public void setMedicines(String medicines) {
        this.medicines = medicines;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public int getNoofdays() {
        return noofdays;
    }

    public void setNoofdays(int noofdays) {
        this.noofdays = noofdays;
    }
}
