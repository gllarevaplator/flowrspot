import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React from "react";
import "./pagination.css";

interface PaginationProps {
  defaultPage: number;
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationForm: React.FC<PaginationProps> = ({
  defaultPage,
  count,
  page,
  onChange,
}) => {
  return (
    <>
      {count > 1 && (
        <div className="pagination mb-2">
          <div className="bg-light border p-2 rounded">
            <Stack spacing={2}>
              <Pagination
                defaultPage={defaultPage}
                count={count}
                page={page}
                onChange={onChange}
              />
            </Stack>
          </div>
        </div>
      )}
    </>
  );
};

export default PaginationForm;
