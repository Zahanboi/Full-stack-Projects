#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <string.h>

#define MAX_THREADS 4  // Set this based on your CPU cores

// Merge two sorted arrays into a single sorted array
void merge(int *arr, int *left, int left_size, int *right, int right_size) {
    int i = 0, j = 0, k = 0;
    
    while (i < left_size && j < right_size) {
        if (left[i] < right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }
    
    // Copy remaining elements from left
    while (i < left_size) {
        arr[k++] = left[i++];
    }
    
    // Copy remaining elements from right
    while (j < right_size) {
        arr[k++] = right[j++];
    }
}

// Merge Sort function to divide the array and merge the results
void merge_sort(int *arr, int size) {
    if (size < 2)
        return;

    int mid = size / 2;

    // Recursively split the array into left and right halves
    merge_sort(arr, mid);
    merge_sort(arr + mid, size - mid);

    int *left = (int *)malloc(mid * sizeof(int));
    int *right = (int *)malloc((size - mid) * sizeof(int));

    memcpy(left, arr, mid * sizeof(int));
    memcpy(right, arr + mid, (size - mid) * sizeof(int));

    merge(arr, left, mid, right, size - mid);

    free(left);
    free(right);
}

// Structure to pass arguments to threads
typedef struct {
    int *arr;
    int size;
} thread_data_t;

// Threaded merge sort function
void *threaded_merge_sort(void *arg) {
    thread_data_t *data = (thread_data_t *)arg;
    merge_sort(data->arr, data->size);
    return NULL;
}

// Parallel Merge Sort function
void parallel_merge_sort(int *arr, int size, int max_threads) {
    if (size <= 1)
        return;

    if (max_threads <= 1) {
        // If we reached the max thread limit, do it sequentially
        merge_sort(arr, size);
        return;
    }

    pthread_t thread1, thread2;
    int mid = size / 2;

    thread_data_t data1 = {arr, mid};
    thread_data_t data2 = {arr + mid, size - mid};

    // Create two threads to sort the left and right halves
    pthread_create(&thread1, NULL, threaded_merge_sort, &data1);
    pthread_create(&thread2, NULL, threaded_merge_sort, &data2);

    // Wait for both threads to finish
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);

    // After sorting both halves, merge them back together
    int *left = (int *)malloc(mid * sizeof(int));
    int *right = (int *)malloc((size - mid) * sizeof(int));

    memcpy(left, arr, mid * sizeof(int));
    memcpy(right, arr + mid, (size - mid) * sizeof(int));

    merge(arr, left, mid, right, size - mid);

    free(left);
    free(right);
}

// Utility function to print an array
void print_array(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10, 56, 71, 41, 91, 5};
    int size = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    print_array(arr, size);

    parallel_merge_sort(arr, size, MAX_THREADS);

    printf("Sorted array: ");
    print_array(arr, size);

    return 0;
}