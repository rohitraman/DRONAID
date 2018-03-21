package com.dronaid.dronaid;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckedTextView;
import android.widget.ListView;

import java.util.List;

/**
 * Created by darthvader on 13/3/18.
 */

public class GetPrescriptionAdapter extends RecyclerView.Adapter<GetPrescriptionAdapter.PrescriptionViewHolder> {
    List<Prescription> list;

    public GetPrescriptionAdapter(List<Prescription> list) {
        this.list = list;
    }

    @Override
    public PrescriptionViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new PrescriptionViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.dialog_prescription,parent,false));
    }

    @Override
    public void onBindViewHolder(PrescriptionViewHolder holder, int position) {
           Prescription temp = list.get(position);
           holder.checkedTextView.setText(temp.getMedicines());
    }

    public void update(List<Prescription> list){
        this.list = list;
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        return list.size();
    }
    public class PrescriptionViewHolder extends RecyclerView.ViewHolder{
        CheckedTextView checkedTextView;
        public PrescriptionViewHolder(View itemView) {
            super(itemView);
            checkedTextView = (CheckedTextView)itemView.findViewById(R.id.checkedTextView);
        }
    }
}
