package com.reporttool.sqlresponse.mapper;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ObjectExtractor implements ResultSetExtractor <List<List<Object>>> {

    @Override
    public List<List<Object>> extractData(ResultSet rs) throws SQLException, DataAccessException {

        ResultSetMetaData md = rs.getMetaData();
        int columns = md.getColumnCount();

        List<List<Object>> listOfLists = new ArrayList<>();

        if (rs.next()) {

            // Adding column names to the first list
            List<Object> columnNames = new ArrayList<>(columns);
            for(int i = 1; i <= columns; ++i){
                columnNames.add(md.getColumnName(i));
            }
            listOfLists.add(columnNames);

            // Adding values of columns for the first row
            List<Object> row = new ArrayList<>(columns);
            for(int i = 1; i <= columns; ++i){
                row.add(rs.getObject(i));
            }
            listOfLists.add(row);
        }

        // Adding values of columns for the rest of rows
        while (rs.next()){
            List<Object> row = new ArrayList<>(columns);
            for(int i = 1; i <= columns; ++i){
                row.add(rs.getObject(i));
            }
            listOfLists.add(row);
        }


        return listOfLists;
    }
}
