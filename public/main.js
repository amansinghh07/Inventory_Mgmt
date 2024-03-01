function deleteProduct(id) {
  const results = confirm("Are you sure you want to delete this product?.");
  if (results) {
    fetch("/delete-product/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        window.location.href = "/";
      }
    });
  }
}
